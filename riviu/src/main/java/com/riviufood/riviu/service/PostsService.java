package com.riviufood.riviu.service;

import com.riviufood.riviu.dtos.PictureDTO;
import com.riviufood.riviu.dtos.PostDTO;
import com.riviufood.riviu.exception.DataNotFoundException;
import com.riviufood.riviu.exception.InvalidParamExcaption;
import com.riviufood.riviu.model.Picture;
import com.riviufood.riviu.model.Post;
import com.riviufood.riviu.model.User;
import com.riviufood.riviu.repository.PictureRepository;
import com.riviufood.riviu.repository.PostRepository;
import com.riviufood.riviu.repository.UserRepository;
import com.riviufood.riviu.service.auth.ProfileService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class PostsService implements IPostsService {
    private final PostRepository postRepositoryresponse;
    private final PictureRepository pictureRepository;

    public PostsService(PostRepository postRepositoryresponse, PictureRepository pictureRepository) {
        this.postRepositoryresponse = postRepositoryresponse;
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
        postRepositoryresponse.save(post);
    }

    @Override
    public Picture createPicture(Long postId, PictureDTO pictureDTO) {
        Post existingPost = postRepositoryresponse.findById(pictureDTO.getPost_id())
                .orElseThrow(() -> new DataNotFoundException("cannot find post with id = " + pictureDTO.getPost_id())
                        );
        Picture picture = Picture.builder()
                .post(existingPost)
                .url(pictureDTO.getUrl())
                .build();
        // cannt insert 5 picture for post
        int size = pictureRepository.findByPostId(postId).size();
        if(size >= 5){
            throw new InvalidParamExcaption("cannot insert 5 img for post");
        }
        return pictureRepository.save(picture);
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
       return postRepositoryresponse.save(post);
    }

    public Post getPostById(Long postId) {
      return postRepositoryresponse.findById(postId)
              .orElseThrow(()-> new DataNotFoundException("dont find post id = " + postId));
    }

    @Override
    public Page<Post> getAllPost(PageRequest pageRequest) {
        //Retrieve posts by page and limit
        return postRepositoryresponse.findAll(pageRequest);
    }

    @Override
    public Post updatePost(Long id, PostDTO postDTO) {
        Post post = getPostById(id);
        if(post != null){
            post.setTitle(postDTO.getTitle());
            post.setContent(postDTO.getContent());
            return postRepositoryresponse.save(post);
        }
        return null;
    }

    @Override
    public void deletePost(long id) {
        Optional<Post> optionalPost =  postRepositoryresponse.findById(id);
        // if optionalPost get Post findById = id -> response::delete tham chieu den ham delete
        optionalPost.ifPresent(postRepositoryresponse::delete);
    }

    @Override
    public boolean existsByTitle(String title) {
        return postRepositoryresponse.existsByTitle(title);
    }


}
