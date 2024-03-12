package object_orienters.techspot.model;

public interface PostBase {

    public void like(Reaction reaction);
    public void comment(Comment comment);
    public void share(Profile sharer);

    public long getPostId();

    public void editPrivacy(Privacy privacy);

    public void delete();



}
