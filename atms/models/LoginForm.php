<?php
namespace atms\models;

use Yii;
use yii\base\Model;

/**
 * Login form
 */
class LoginForm extends Model
{
    public $username;
    public $password;
    public $rememberMe = false;

    private $_user;
    private  $_userProfile;
    public $loginFailedMsg = "";

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            // username and password are both required
            [['username', 'password'], 'required', 'message' => 'Nhập vào {attribute}'],
            [['password'], "string","max" => 20, 'tooLong' => '{attribute} quá dài.', 'tooShort' => 'Mật khẩu quá ngắn.', "message" => "Nhập vào {attribute} chứa các ký tự."],
            // rememberMe must be a boolean value
            ['rememberMe', 'boolean'],
            // password is validated by validatePassword()
            ['password', 'validatePassword'],
        ];
    }

    public function attributeLabels(){
        return [
            'username' => 'Tên đăng nhập',
            'password'  => 'Mật khẩu'
        ];
    }
    /**
     * Validates the password.
     * This method serves as the inline validation for password.
     *
     * @param string $attribute the attribute currently being validated
     * @param array $params the additional name-value pairs given in the rule
     */
    public function validatePassword($attribute, $params)
    {
        if (!$this->hasErrors()) {
            $user = $this->getUser();
            if (!$user || !$user->validatePassword($this->password)) {
                $this->addError('$attribute', 'Tên đăng nhập và mật khẩu không hợp lệ.');
                $this->loginFailedMsg = "Tên đăng nhập và mật khẩu không hợp lệ.";
            }
        }
    }

    /**
     * Logs in a user using the provided username and password.
     *
     * @return bool whether the user is logged in successfully
     */
    public function login() {
        if ($this->validate()) {
            
            $user = $this->getUser();
            $isSuccess = false;
            if ($user)
            {
                 $this->_user = $user;
                 $isSuccess = Yii::$app->user->login($user, $this->rememberMe ? 3600 * 24 * 30 : 0);
                if ($isSuccess) {
                    $this->_user->updateLastLogin();
                }
            }
            
            return $isSuccess;
        } else {
            return false;
        }
    }
    
  

    /**
     * Finds user by [[username]]
     *
     * @return User|null
     */
    protected function getUser()
    {
        if ($this->_user === null) {
            $this->_user = User::findByUsername($this->username);
        }

        return $this->_user;
    }
    
    public function getUserLoggedin()
    {
        return $this->_user;
    }
    
    public function getUserLoggedinProfile()
    {
        return $this->_userProfile;
    }
}
