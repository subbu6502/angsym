<?php
/**
 * This is a file with php code.
 *
 * @package ROGOIT
 * @author  Roland Golla <rolandgolla@gmail.com>
 */

namespace Rogoit\AngsymBundle\Controller;

use Rogoit\AngsymBundle\Api\Exception as ApiException;
use Rogoit\AngsymBundle\Entity\User;
use FOS\RestBundle\Controller\Annotations\Route as RestRoute;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\View\View as RestView;
use JMS\Serializer\Exception\Exception;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class UserRestController extends Controller
{
    /**
     * Api get user function.
     * @param string $username Username to find.
     * @throws Exception Not found.
     * @View(serializerGroups={"Default","Details"})
     * @return mixed
     */
    public function getUserAction($username)
    {
        $user = $this->getDoctrine()->getRepository('AppBundle:User')->findOneByUsername($username);
        if (!is_object($user)) {
            throw $this->createNotFoundException();
        }
        
        return $user;
    }

    /**
     * Create a new resource
     *
     * @return View view instance
     * 
     * @ParamConverter("user", converter="fos_rest.request_body")
     * @RestRoute(path="/rogoit/api/users")
     */
    public function postUserAction(User $user)
    {
        $result = $this->get('rogoit.app.user_handler')->register($user);
        
        if (true === $result) {
            RestView::create(['id' => $user->getId()], 201);
        }
        
        return new RestView($result, 400);
    }

    /**
     * @Route("/rogoit/api/unlock/{unlockToken}")
     * @Method("POST")
     */
    public function unlockUserAction(Request $request, User $user)
    {
        $data = json_decode($request->getContent(), true);
        $result = $this->get('rogoit.app.user_handler')->unlock(
            $user,
            $data['username'],
            $data['password']
        );
        
        if (true === $result) {
            return RestView::create(['id' => $user->getId()]);
        }
        
        return new RestView($result, 400);
    }

    /**
     * Shortcut to throw a AccessDeniedException($message) if the user is not authenticated
     * @param String $message The message to display (default:'warn.user.notAuthenticated')
     */
    protected function forwardIfNotAuthenticated($message='warn.user.notAuthenticated'){
        if (!is_object($this->getUser()))
        {
            throw new AccessDeniedException($message);
        }
    }

}
