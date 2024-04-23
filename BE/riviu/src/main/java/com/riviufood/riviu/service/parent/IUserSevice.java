package com.riviufood.riviu.service.parent;

import com.riviufood.riviu.dtos.UserDto;

import java.util.List;

public interface IUserSevice {

    List<UserDto> getALlUser();

    UserDto findbyUserName(UserDto userDto);


}
