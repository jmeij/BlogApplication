﻿namespace BlogApplication.Models
{
    public class BlogPostEntity
    {
        public string Id { get; set; }
        public required string Title { get; set; }

        public required string Content { get; set; }
    }
}
