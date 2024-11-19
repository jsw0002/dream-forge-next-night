import { useParams } from "react-router-dom";
import blogs from "./json/blogs";

import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import Header, {
  NavLink,
  LogoLink,
  NavToggle,
  DesktopNavLinks,
} from "./components/headers/light.js";

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;
const Container = styled.div`
  ${tw`relative -mt-8 bg-center bg-cover`}
  background-image: url("${({ image }) => image}");
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-primary-500 opacity-25`;

const HeroContainer = tw.div`z-20 relative px-4 sm:px-8 max-w-screen-xl mx-auto`;
const SingleColumn = tw.div`pt-24 pb-32 px-4 flex flex-col items-center`;

const Heading = styled.h1`
  ${tw`text-3xl text-center lg:text-left sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-none`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const SlantedBackgroundContainer = tw.span`relative px-24`;

const SlantedBackground = styled.span`
  ${tw`relative text-primary-500 px-4 -mx-4 py-2`}
  &::before {
    content: "";
    ${tw`absolute bg-gray-100 transform -skew-x-12 -z-10`}
    inset: 0;
  }
`;

const MetaContainer = tw.div`w-full flex flex-col gap-6`;

const CategoryList = tw.div`flex flex-wrap gap-2`;
const CategoryTag = tw.span`px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium`;

const MetaInfo = tw.div`inline-flex items-center bg-black bg-opacity-50 px-4 py-2 rounded self-start`;
const MetaText = tw.span`text-sm font-medium tracking-wide text-white`;
const Divider = tw.span`text-white mx-2`;

const MarkdownContainer = tw.div`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12`;

const StyledMarkdown = styled(ReactMarkdown)`
  h1 {
    ${tw`text-4xl font-bold mb-4`}
  }
  h2 {
    ${tw`text-3xl font-semibold mb-3`}
  }
  h3 {
    ${tw`text-2xl font-semibold mb-3`}
  }
  h4 {
    ${tw`text-xl font-medium mb-2`}
  }
  h5 {
    ${tw`text-lg font-medium mb-2`}
  }
  h6 {
    ${tw`text-base font-medium mb-2`}
  }
  a {
    ${tw`text-primary-500`}
  }
  ul {
    ${tw`list-disc list-inside`}
  }
  p {
    ${tw`mb-4`}
  }
  ol {
    ${tw`list-decimal list-inside`}
  }
  code {
    ${tw`bg-gray-100 text-gray-900 p-1 rounded-md`}
  }
  pre {
    ${tw`bg-gray-100 text-gray-900 p-4 rounded-md`}
  }
  blockquote {
    ${tw`border-l-4 border-primary-500 pl-4 italic`}
  }
  hr {
    ${tw`my-8`}
  }
`;

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

const BlogPost = () => {
  const { slug } = useParams();
  const blog = blogs.find((blog) => blog.slug === slug);
  console.log("🚀 ~ BlogPost ~ blog:", blog);
  return (
    <>
      <Container image={blog.image}>
        <OpacityOverlay />
        <HeroContainer>
          <StyledHeader />
          <SingleColumn>
            <MetaContainer>
              <CategoryList>
                {blog.categories.map((category) => (
                  <CategoryTag key={category}>{category}</CategoryTag>
                ))}
              </CategoryList>

              <Heading>
                <SlantedBackgroundContainer>
                  <SlantedBackground>{blog.title}</SlantedBackground>
                </SlantedBackgroundContainer>
              </Heading>

              <MetaInfo>
                <MetaText>{formatDate(blog.date)}</MetaText>
                <Divider>•</Divider>
                <MetaText>{blog.author}</MetaText>
              </MetaInfo>
            </MetaContainer>
          </SingleColumn>
        </HeroContainer>
      </Container>
      <MarkdownContainer>
        <StyledMarkdown>{blog.content}</StyledMarkdown>
      </MarkdownContainer>
    </>
  );
};

export default BlogPost;
