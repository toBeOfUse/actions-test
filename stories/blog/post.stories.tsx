import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { userEvent, within, expect, waitFor } from "@storybook/test";

import Post from "./post";
import { SanityPost, getSanityPosts } from "../../sanity";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Post",
  component: Post,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info:
    // https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry:
  // https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {},
} satisfies Meta<typeof Post>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const FixedContent: Story = {
  args: {
    author: "Mitch",
    authorImage: "https://crouton.net/crouton.png",
    content: "this is a blog post",
    date: "Today",
    title: "A Post",
    likeCallback(likedNow) {
      console.log("post is liked:", likedNow);
    },
    liked: false,
  },
};

export const SanityContent: Story = {
  args: {
    ...FixedContent.args,
  },
  // @ts-ignore no idea why it's expecting the wrong type here.
  render: function Render(
    args,
    { loaded: { post } }: { loaded: { post: SanityPost } }
  ) {
    return (
      <Post
        {...args}
        author={post.author.name}
        authorImage={post.authorImage}
        date={new Date(post.publishedAt).toLocaleDateString()}
        content={post.body
          .flatMap((c) => c.children.map((d) => d.text))
          .join("\n")}
        title={post.title}
      />
    );
  },
  loaders: [
    async (): Promise<{ post: SanityPost }> => ({
      post: (await getSanityPosts())[0],
    }),
  ],
};

export const LikeTest: Story = {
  ...FixedContent,
  render: function Render(args) {
    const [_, updateArgs] = useArgs();
    return (
      <Post
        {...args}
        likeCallback={(liked) => updateArgs({ ...args, liked })}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // unliked
    await expect(canvas.getByTestId("FavoriteBorderIcon")).toBeInTheDocument();

    // liked
    await userEvent.click(canvas.getByTestId("like_button"));
    await waitFor(async () => await expect(canvas.getByTestId("FavoriteIcon")).toBeInTheDocument());

    // unliked again :(
    await userEvent.click(canvas.getByTestId("like_button"));
    await waitFor(async () => await expect(canvas.getByTestId("FavoriteBorderIcon")).toBeInTheDocument());
  },
};
