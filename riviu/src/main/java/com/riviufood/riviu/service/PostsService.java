package com.riviufood.riviu.service;

import com.riviufood.riviu.converter.PostConverter;
import com.riviufood.riviu.dtos.PictureDTO;
import com.riviufood.riviu.dtos.PostDTO;
import com.riviufood.riviu.exception.DataNotFoundException;
import com.riviufood.riviu.exception.InvalidParamExcaption;
import com.riviufood.riviu.model.Picture;
import com.riviufood.riviu.model.Post;
import com.riviufood.riviu.model.User;
import com.riviufood.riviu.repository.PictureRepository;
import com.riviufood.riviu.repository.PostRepository;
import com.riviufood.riviu.service.auth.ProfileService;
import com.riviufood.riviu.service.parent.IPostsService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostsService implements IPostsService {

    private final PostRepository postRepository;
    private final PictureRepository pictureRepository;

    public PostsService(PostRepository postRepository, PictureRepository pictureRepository) {
        this.postRepository = postRepository;
        this.pictureRepository = pictureRepository;
    }


    @Override
    public void savePost(PostDTO postDTO) {
        User user = ProfileService.getLoggedInUser();
        Post post = new Post();
        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());
        post.setCreatedDate(new Date());
        post.setUser(user);
        post.setCreateBy(user.getUsername());
        postRepository.save(post);
    }

    @Override
    public Picture createPicture(Long postId, PictureDTO pictureDTO) {
        return null;
    }

    @Override
    public List<Post> searchByTitle(String title) {

        List<Post> results = postRepository.searchByTitle(title);
        return results;
    }

    @Override
    public List<Post> findByAll() {

        return postRepository.findAll();
    }

    @Override
    public Post createPosts(PostDTO postDTO) {
       User user = ProfileService.getLoggedInUser();
       Post post = new Post();
       post.setTitle(postDTO.getTitle());
       post.setContent(postDTO.getContent());
       post.setCreatedDate(new Date());
       post.setUser(user);
       post.setCreateBy(user.getFirstName() + " " + user.getLastName());
       return postRepository.save(post);
    }

    public Post getPostById(Long postId) {
      return postRepository.findById(postId)
              .orElseThrow(()-> new DataNotFoundException("dont find post id = " + postId));
    }

    @Override
    public Page<Post> getAllPost(PageRequest pageRequest) {
        //Retrieve posts by page and limit
        return postRepository.findAll(pageRequest);
    }

    @Override
    public Post updatePost(Long id, PostDTO postDTO) {
        Post post = getPostById(id);
        if(post != null){
            post.setTitle(postDTO.getTitle());
            post.setContent(postDTO.getContent());
            return postRepository.save(post);
        }
        return null;
    }

    @Override
    public void deletePost(long id) {
        Post post = postRepository.findById(id).orElseThrow(()
        -> new DataNotFoundException("cannot find post with id = " + id));
        List<Picture> pictures = pictureRepository.findByPostId(id);
        for (Picture picture : pictures) {
            pictureRepository.delete(picture);
        }
        postRepository.delete(post);

    }

    @Override
    public boolean existsByTitle(String title) {
        return postRepository.existsByTitle(title);
    }


}
