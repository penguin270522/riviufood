package com.riviufood.riviu.service.auth;

import com.riviufood.riviu.converter.BaseConverter;
import com.riviufood.riviu.dtos.UserDto;
import com.riviufood.riviu.model.User;
import com.riviufood.riviu.repository.UserRepository;
import com.riviufood.riviu.service.parent.IUserSevice;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService, IUserSevice {

    private final UserRepository userRepository;
    private final BaseConverter baseConverter;

    public UserService(UserRepository userRepository, BaseConverter baseConverter) {
        this.userRepository = userRepository;
        this.baseConverter = baseConverter;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("khong tim thay nguoi dung"));

    }


    @Override
    public List<UserDto> getALlUser() {
        List<UserDto> userDtoList = new ArrayList<>();
        List<User> users = userRepository.findAll();
        for(User user : users){
            UserDto item = new UserDto();
            item.setName(user.getUsername());
            item.setEmail(user.getEmail());
            userDtoList.add(item);
        }
        return userDtoList;
    }

    @Override
    public UserDto findbyUserName(UserDto userDto) {
        User user = userRepository.findByUsername(userDto.getName()).orElseThrow(
                ()-> new RuntimeException("khong tim thay nguoi dung")
        );
        UserDto userDto1 = new UserDto();
        userDto1.setName(user.getUsername());
        userDto1.setEmail(user.getEmail());
        return userDto1;
    }
}
