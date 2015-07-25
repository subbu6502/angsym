<?php
/**
 * User entity.
 *
 * @package ROGOIT
 * @author  Roland Golla <rolandgolla@gmail.com>
 */

namespace Rogoit\AngsymBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serialize;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 */
class User extends BaseUser
{
    const ROLE_DEFAULT = 'ROLE_API_USER';
    
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    
    /**
     * @ORM\Column(type="string", nullable=true)
     * @Serialize\Exclude()
     */
    protected $unlockToken;
    
    /**
     * @Serialize\Type("string")
     */
    protected $plainPassword;

    /**
     * Constructor.
     */
    public function __construct()
    {
        parent::__construct();
        // your own logic
    }
    
    public function initialize()
    {
        $this->salt = base_convert(sha1(uniqid(mt_rand(), true)), 16, 36);
        $this->enabled = false;
        $this->locked = false;
        $this->expired = false;
        $this->roles = array();
        $this->credentialsExpired = false;
    }

    /**
     * @return string
     */
    public function getUnlockToken()
    {
        return $this->unlockToken;
    }

    /**
     * @param string $unlockToken
     */
    public function setUnlockToken($unlockToken)
    {
        $this->unlockToken = $unlockToken;
    }
}
