package com.riviufood.riviu.service.parent;

import com.riviufood.riviu.dtos.AuthenticationDTO;
import com.riviufood.riviu.dtos.UserDto;
import com.riviufood.riviu.model.User;

public interface IUserService {

    User createUser(UserDto userDto);

    AuthenticationDTO login(UserDto userDto);

}
