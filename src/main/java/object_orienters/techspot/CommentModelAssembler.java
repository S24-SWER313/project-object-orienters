package object_orienters.techspot;

import object_orienters.techspot.model.Comment;
import object_orienters.techspot.model.Content;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.lang.NonNull;
import org.springframework.lang.NonNullApi;
import org.springframework.stereotype.Component;

@Component

public class CommentModelAssembler implements RepresentationModelAssembler<Content, EntityModel<Content>>{
    @Override
    @NonNull
    public EntityModel<Content> toModel(@NonNull Content entity) {
        return EntityModel.of(entity);
    }

    @Override
    @NonNull
    public CollectionModel<EntityModel<Content>> toCollectionModel(Iterable<? extends Content> entities) {
        return RepresentationModelAssembler.super.toCollectionModel(entities);
    }
}
