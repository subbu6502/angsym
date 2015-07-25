<?php
/**
 * Service for auth.
 *
 * @package ROGOIT
 * @author  Roland Golla <rolandgolla@gmail.com>
 */

namespace Rogoit\AngsymBundle\Handler;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\SecurityContextInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;

/**
 * Class AuthenticationHandler.
 * @package Rogoit\AngsymBundle\Handler
 */
class AuthenticationHandler implements AuthenticationSuccessHandlerInterface, AuthenticationFailureHandlerInterface
{
    /**
     * Success case.
     * @param Request        $request Request object.
     * @param TokenInterface $token   Token interface.
     * @return RedirectResponse|Response
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
        return new JsonResponse(['user' => $token->getUsername()]);
    }

    /**
     * Failure case.
     * @param Request                 $request   Request object.
     * @param AuthenticationException $exception Auth exception.
     * @return RedirectResponse|Response
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        return new JsonResponse([], 401);
    }
}
