import { useParams } from "react-router-dom";
import { useMemo } from "react";
import blogs from "json/blogs";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import {
  Image,
  Post,
  PostContainer,
  Info,
  Category,
  CreationDate,
  Title,
  Description,
} from "components/blogs/BlogCard";
import tw from "twin.macro";
import Header from "components/headers/light";
import { Heading, HeadingRow } from "Blog";

const BlogGrid = tw.div`mt-6 sm:-mr-8 flex flex-wrap`;

export default function Blog() {
  // Add this to filter blogs by category
  const { category } = useParams(); // You'll need to set up this route parameter
  console.log("🚀 ~ Blog ~ category:", category);

  const filteredBlogs = useMemo(() => {
    if (!category) return blogs;
    return blogs.filter((blog) => blog.categories.includes(category));
  }, [blogs, category]);

  return (
    <>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{category}</Heading>
          </HeadingRow>
          <BlogGrid>
            {filteredBlogs.map((blog) => (
              <PostContainer key={blog.id}>
                <Post>
                  <Image imageSrc={blog.image} />
                  <Info>
                    <Category>{blog.categories[0]}</Category>
                    <CreationDate>{blog.date}</CreationDate>
                    <Title>{blog.title}</Title>
                    <Description>{blog.description}</Description>
                  </Info>
                </Post>
              </PostContainer>
            ))}
          </BlogGrid>
        </ContentWithPaddingXl>
      </Container>
    </>
  );
}
