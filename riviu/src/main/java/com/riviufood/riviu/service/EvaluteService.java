package com.riviufood.riviu.service;

import com.riviufood.riviu.dtos.EvaluteDTO;
import com.riviufood.riviu.model.Evalute;
import com.riviufood.riviu.model.Location;
import com.riviufood.riviu.model.Post;
import com.riviufood.riviu.repository.EvaluteRepository;
import com.riviufood.riviu.repository.PostRepository;
import com.riviufood.riviu.service.parent.IEvaluteService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class EvaluteService implements IEvaluteService {
    private final PostsService postsService;
    private final PostRepository postRepository;
    private final LocationService locationService;
    private final EvaluteRepository evaluteRepository;
    @Override
    public Evalute saveEvalute(Long postId, EvaluteDTO evaluteDTO) {
        Post post = postsService.getPostById(postId);
        Location location = locationService.findById(evaluteDTO.getLocationId());
        Evalute evalute = new Evalute();
        evalute.setOverall(evaluteDTO.getOverall());
        evalute.setCleanLiness(evaluteDTO.getCleanLiness());
        evalute.setPrice(evaluteDTO.getPrice());
        evalute.setFlavor(evaluteDTO.getFlavor());
        evalute.setService(evaluteDTO.getService());
        evalute.setSpace(evaluteDTO.getSpace());
        evaluteRepository.save(evalute);
        if(post != null){
            evalute.setPost(post);
            post.setEvaluate(evalute);
            postRepository.save(post);
        }
        if(location != null){
            evalute.setLocation(location);
        }
        return evaluteRepository.save(evalute);
    }
}
