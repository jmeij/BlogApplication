namespace BlogApplication.Models
{
    public class BlogPost
    {
        public string Id { get; set; }
        public required string Title { get; set; }

        public required string Content { get; set; }
    }
}
