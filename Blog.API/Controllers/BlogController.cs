using BlogApplication.Models;
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
                Id = bp.Key,
                Title = bp.Object.Title,
                Content = bp.Object.Content
            }));
        }

        [HttpDelete("{id}", Name = "DeleteBlogPost")]
        public async Task<IActionResult> Delete(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest(new { message = "Blog post ID is required." });
            }
            var firebaseClient = new FirebaseClient(_fireBaseConfig.DatabaseUrl);

            try
            {
                await firebaseClient.Child("BlogPosts").Child(id).DeleteAsync();
                return Ok(new { message = "Blog post deleted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = $"Error deleting blog post: {ex.Message}" });
            }
        }

        [HttpPost(Name = "SaveBlogPost")]
        public async Task<IActionResult> Post(BlogPost post)
        {
            var firebaseClient = new FirebaseClient(_fireBaseConfig.DatabaseUrl);
            var blogPost = new BlogPostEntity
            {
                Title = post.Title,
                Content = post.Content
            };

            await firebaseClient.Child("BlogPosts").PostAsync(blogPost);
            return Ok();
        }
    }
}
