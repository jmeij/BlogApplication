using BlogApplication.Interfaces;
using Firebase.Database;
using Firebase.Database.Query;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace BlogApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class BlogController : ControllerBase
    {
        private readonly FirebaseConfig _fireBaseConfig;
        public BlogController(IOptions<FirebaseConfig> fireBaseConfig)
        {
            _fireBaseConfig = fireBaseConfig.Value;
        }

        [HttpGet(Name = "GetBlogPosts")]
        public async Task<IActionResult> Get()
        {
            var firebaseClient = new FirebaseClient(_fireBaseConfig.DatabaseUrl);
            var blogPosts = await firebaseClient.Child("BlogPosts").OnceAsync<BlogPostEntity>();
            return Ok(blogPosts.Select(bp => new BlogPost
            {
                Title = bp.Object.Title,
                Content = bp.Object.Content
            }));
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
