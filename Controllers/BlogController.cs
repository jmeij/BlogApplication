using BlogApplication.Interfaces;
using Firebase.Database;
using Firebase.Database.Query;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace BlogApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class BlogController : ControllerBase
    {
        private readonly FirebaseConfig _fireBaseConfig;
        public BlogController(IOptions<FirebaseConfig> fireBaseConfig)
        {
            _fireBaseConfig = fireBaseConfig.Value;
        }

        [HttpPost(Name = "SaveBlogPost")]
        public async Task<IActionResult> Post(BlogPost post)
        {
            var firebaseClient = new FirebaseClient(_fireBaseConfig.DatabaseUrl);
            var blogPost = new BlogPostEntity
            {
                Title = "Blog Post Title",
                Content = "Blog Post Content"
            };

            await firebaseClient.Child("BlogPosts").PostAsync(blogPost);
            return Ok();
        }
    }
}
