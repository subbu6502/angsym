<?php

namespace Rogoit\AngsymBundle\Security;

use Rogoit\AngsymBundle\Api\Exception;
use Rogoit\AngsymBundle\Entity\User;
use FOS\UserBundle\Model\UserManagerInterface;
use Symfony\Component\Security\Core\Util\SecureRandomInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class RegistrationHandler
{
    /**
     * @var UserManagerInterface
     */
    private $userManager;

    /**
     * @var SecureRandomInterface
     */
    private $randomGenerator;

    /**
     * @var ValidatorInterface
     */
    private $validator;

    public function __construct(
        UserManagerInterface $userManager,
        SecureRandomInterface $randomGenerator,
        ValidatorInterface $validator
    ) {
        $this->userManager = $userManager;
        $this->randomGenerator = $randomGenerator;
        $this->validator = $validator;
    }

    public function register(User $user)
    {
        $user->initialize();
        $user->setUsername($user->getEmail());
        $user->setPlainPassword(
            md5($this->randomGenerator->nextBytes(16))
        );
        $user->setUnlockToken(
            md5($this->randomGenerator->nextBytes(16))
        );
        $user->setEnabled(true);
        
        $errors = $this->validator->validate($user, ['Registration']);
        
        if ($errors->count() === 0) {
            try {
                $this->userManager->updateUser($user);
            } catch (\Exception $e) {
                throw new Exception($e->getMessage());
            }
            
            // TODO: send unlock email
            
            return true;
        }
        
        return $errors;
    }
    
    public function unlock(User $user, $username, $password)
    {
        $user->setUsername($username);
        $user->setPlainPassword($password);
        $user->setUnlockToken(null);
        $errors = $this->validator->validate($user, ['Registration']);
        
        if ($errors->count() === 0) {
            try {
                $this->userManager->updateUser($user);
            } catch (\Exception $e) {
                throw new Exception($e->getMessage());
            }
            
            return true;
        }
        
        return $errors;
    }
}