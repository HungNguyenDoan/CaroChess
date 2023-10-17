package com.example.caro.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.caro.JWT.JWTUserDetail;
import com.example.caro.models.User;
import com.example.caro.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    public UserService(@Lazy PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return new JWTUserDetail(user);
    }

    public void create(String username, String password,String name) throws Exception {
        User existUser = userRepository.findByUsername(username);
        if (existUser != null) {
            throw new Exception("Tài khoản đã tồn tại");
        }
        User user = User.builder()
                            .name(name)
                            .username(username)
                            .password(this.passwordEncoder.encode(password))
                            .role("USER")
                            .build();
        userRepository.save(user);
    }

    public User getOne(String username) {
        User user = userRepository.findByUsername(username);
        return user;
    }
}
