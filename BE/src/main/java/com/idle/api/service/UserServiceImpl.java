/**
*
* UserServiceImpl
* 회원가입 insertUser 함수 생성
*
* @author Alice
* @version 1.0.0
* 생성일 2022-03-10
* 마지막 수정일 2022-03-10
**/
package com.idle.api.service;

import com.idle.api.request.UserSignUpRequest;
import com.idle.db.entity.User;
import com.idle.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    /* Alice */
    @Override
    public String insertUser(UserSignUpRequest userSignUpRequest) {
        User user = userSignUpRequest.toEntity();
        user.setUserPw("{noop}" + user.getUserPw());    // Security ver5 부터 명칭 해줘야함
        userRepository.save(user);
        return "success";
    }
}