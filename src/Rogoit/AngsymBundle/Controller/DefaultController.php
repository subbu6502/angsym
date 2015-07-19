<?php

namespace Rogoit\AngsymBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class DefaultController extends Controller
{
    /**
     * @Route("/rogoit/")
     * @Template()
     */
    public function indexAction()
    {
        return array();
    }
}
