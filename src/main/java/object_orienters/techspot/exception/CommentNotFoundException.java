package object_orienters.techspot.exception;

public class CommentNotFoundException extends Exception{
    public CommentNotFoundException(long commentId) {
        super("Comment with id " + commentId + " not found");
    }
}
