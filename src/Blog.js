import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";
import blogs from "./json/blogs";

export const HeadingRow = tw.div`flex`;
export const Heading = tw(SectionHeading)`text-gray-900 capitalize`;
const Posts = tw.div`mt-6 sm:-mr-8 flex flex-wrap`;
const PostContainer = styled.div`
  ${tw`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
  ${(props) =>
    props.featured &&
    css`
      ${tw`w-full!`}
      ${Post} {
        ${tw`sm:flex-row! h-full sm:pr-4`}
      }
      ${Image} {
        ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg`}
      }
      ${Info} {
        ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
      }
      ${Description} {
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
      }
    `}
`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
const Image = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;
const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = styled.div`
  ${tw`mt-1 font-black text-2xl text-gray-900 group-hover:text-primary-500 transition duration-300`}
  height: 4rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
`;
const Description = tw.div``;

const CategoryNav = tw.nav`flex flex-wrap items-center gap-2 mb-8`;
const CategoryLink = styled.a`
  ${tw`text-primary-500 hover:text-primary-700 font-medium capitalize inline-flex items-center`}
  &:not(:last-child)::after {
    content: "•";
    ${tw`mx-2 text-primary-500`}
  }
`;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;

console.log("blogs: ", blogs);
// sort blogs by featured first
// if there is more than one featured blog only display the first one
const sortedBlogs = blogs.sort((a, b) => b.featured - a.featured);
// then sort by date
const sortedBlogsByDate = sortedBlogs.sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

// Helper functions at the top
const sortByDate = (a, b) => new Date(b.date) - new Date(a.date);

const getFirstFeaturedPost = (posts) => {
  return posts.find((post) => post.featured);
};

const getNonFeaturedPosts = (posts, limit = 6) => {
  return posts
    .filter((post) => !post.featured)
    .sort(sortByDate)
    .slice(0, limit);
};

const getCategories = (posts) => {
  return [...new Set(posts.map((post) => post.categories).flat())];
};

export default ({ headingText = "Blog Posts" }) => {
  // Get the first featured post overall
  const featuredPost = getFirstFeaturedPost(blogs);

  // Get recent non-featured posts
  const recentPosts = getNonFeaturedPosts(blogs);
  const categories = getCategories(blogs);

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{headingText}</Heading>
          </HeadingRow>

          {/* Category Navigation */}
          <CategoryNav>
            {categories.map((category) => (
              <CategoryLink href={`/blog/category/${category}`} key={category}>
                {category}
              </CategoryLink>
            ))}
          </CategoryNav>

          {/* Single Featured Post */}
          {featuredPost && (
            <>
              <SectionHeading>Featured Post</SectionHeading>
              <PostContainer featured={true}>
                <Post
                  className="group"
                  as="a"
                  href={`/blog/${featuredPost.slug}`}>
                  <Image imageSrc={featuredPost.image} />
                  <Info>
                    <Category>{featuredPost.categories[0]}</Category>
                    <CreationDate>{featuredPost.date}</CreationDate>
                    <Title>{featuredPost.title}</Title>
                    {featuredPost.description && (
                      <Description>{featuredPost.description}</Description>
                    )}
                  </Info>
                </Post>
              </PostContainer>
            </>
          )}

          {/* Recent Posts Section */}
          <SectionHeading tw="mt-20">Recent Posts</SectionHeading>
          <Posts>
            {recentPosts.map((post) => (
              <PostContainer key={post.slug}>
                <Post className="group" as="a" href={`/blog/${post.slug}`}>
                  <Image imageSrc={post.image} />
                  <Info>
                    <Category>{post.categories[0]}</Category>
                    <CreationDate>{post.date}</CreationDate>
                    <Title>{post.title}</Title>
                  </Info>
                </Post>
              </PostContainer>
            ))}
          </Posts>
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};

const getPlaceholderPost = () => ({
  imageSrc:
    "https://images.unsplash.com/photo-1418854982207-12f710b74003?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80",
  category: "Travel Guide",
  date: "April 19, 2020",
  title: "Visit the beautiful Alps in Switzerland",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  url: "https://reddit.com",
});
