// @mui
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// routes
import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hook';
import { RouterLink } from 'src/routes/components';
// utils
import { fShortenNumber } from 'src/utils/format-number';
// api
import { useGetPost, useGetLatestPosts } from 'src/api/blog';
// components
import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import PostList from '../post-list';
import PostCommentList from '../post-comment-list';
import PostCommentForm from '../post-comment-form';
import PostDetailsHero from '../post-details-hero';
import { PostDetailsSkeleton } from '../post-skeleton';

// ----------------------------------------------------------------------

export default function PostDetailsHomeView() {
  const params = useParams();

  const { title } = params;

  const { post, postError, postLoading } = useGetPost(`${title}`);

  const { latestPosts, latestPostsLoading } = useGetLatestPosts(`${title}`);

  // ----------------------------------------------------------------------
  // Mock data (used as a fallback for testing when API is unavailable)
  const MOCK_POST = {
    id: 'mock-post-1',
    title: 'The Rise of Alternative Investments: Why They Matter for You',
    coverUrl: '/assets/images/blogs/blog-details.png',
    author: { name: 'xyz co.' },
    createdAt: new Date().toISOString(),
    description:
      'India’s alternative investment market is growing faster than ever, attracting both beginners and seasoned investors. From corporate bonds and asset leasing to invoice discounting, these options offer unique advantages beyond traditional avenues.',
    content: `
      <p>India’s alternative investment market is undergoing rapid transformation. Once limited to institutional investors, opportunities like corporate bonds, asset leasing, and invoice discounting are now becoming more accessible to retail investors. This shift is creating new ways to diversify portfolios, manage risk, and generate attractive returns beyond traditional assets such as equities and fixed deposits.</p>

      <p>In 2023, commitments to Alternative Investment Funds (AIFs) reached record highs, with the AIF-to-GDP ratio at ~3%. Experts project this figure could double in the coming years, reflecting growing confidence in the sector. Let’s explore how alternative investments are reshaping India’s financial landscape and why you should consider them.</p>

      <h3>The Growing Popularity of Alternative Investments</h3>
      <p>The appeal of alternative investments lies in their ability to deliver higher returns, portfolio diversification, and resilience during volatile markets. Investors are increasingly drawn to:</p>
      <ul>
        <li><strong>Corporate Bonds</strong> — Offering predictable fixed income and lower risk compared to equities.</li>
        <li><strong>Asset Leasing</strong> — Generating steady rental income from high-value assets.</li>
        <li><strong>Invoice Discounting</strong> — Helping businesses with liquidity while providing investors short-term yields.</li>
      </ul>
      <p>These instruments were once dominated by large institutions but are now opening doors for retail investors through digital platforms.</p>

      <h4>Key Drivers of Growth</h4>
      <p>Several factors are fueling the rise of alternative investments in India:</p>
      <ol>
        <li><strong>Digital Platforms:</strong> Technology-driven platforms are simplifying access to assets like bonds or invoice discounting, with seamless onboarding and transparent tracking.</li>
        <li><strong>Government Initiatives:</strong> Regulatory support and frameworks are boosting investor trust.</li>
        <li><strong>Changing Investor Behaviour:</strong> With rising financial literacy, investors are seeking beyond-traditional options to safeguard and grow their wealth.</li>
      </ol>

      <h3>Expanding Opportunities for Retail Investors</h3>
      <p>Alternative investment platforms are enabling individuals to tap into opportunities that were once exclusive to institutional players:</p>
      <ul>
        <li><strong>Private Equity &amp; Unlisted Bonds</strong> — Long-term wealth-building avenues.</li>
        <li><strong>Peer-to-Peer Lending</strong> — Directly connecting lenders with borrowers.</li>
        <li><strong>Crowdfunding &amp; New-Age Fixed Income Products</strong> — Offering attractive yields with manageable risks.</li>
      </ul>
      <p>This democratization of access is creating a level playing field for retail investors, empowering them with greater control over their financial strategies.</p>

      <h3>Why You Should Care</h3>
      <p>By including alternative assets in your portfolio, you can:</p>
      <ul>
        <li>Diversify beyond traditional equities and FDs</li>
        <li>Earn potentially higher, more stable returns</li>
        <li>Access unique investment opportunities previously unavailable to retail investors</li>
        <li>Hedge against volatility in stock markets</li>
      </ul>
      <p>In short, alternative investments can strengthen your portfolio’s resilience while opening new pathways for growth.</p>

      <h3>Looking Ahead</h3>
      <p>India’s alternative investment market is poised for remarkable expansion. As more investors turn to digital-first platforms and financial innovations, the sector will play a critical role in shaping the future of personal finance. With the right approach, these opportunities can help you build a portfolio that balances growth, stability, and long-term wealth creation.</p>

      <h3>Closing Thoughts</h3>
      <p>The shift toward alternative investments is not just a trend — it’s a financial evolution. By exploring corporate bonds, asset leasing, invoice discounting, and other alternatives, retail investors can access once-exclusive markets and craft strategies that match their goals and risk appetite.</p>

      <p style="font-size:12px; opacity:0.8; margin-top:24px;">Grow your wealth with exclusive access to high-yield alternative fixed-income opportunities from altGrail. Join us today to explore new-age investment products and build a diversified portfolio tailored to your financial goals.</p>
    `,
    tags: ['Alternative Investments', 'Personal Finance'],
    totalFavorites: 128,
    favoritePerson: [
      { name: 'Alice', avatarUrl: '/assets/images/avatars/avatar_1.jpg' },
      { name: 'Bob', avatarUrl: '/assets/images/avatars/avatar_2.jpg' },
      { name: 'Cara', avatarUrl: '/assets/images/avatars/avatar_3.jpg' },
    ],
    comments: [
      {
        id: 'c1',
        name: 'Neeraj',
        message: 'Great introduction. Looking forward to more insights!',
        postedAt: new Date().toISOString(),
        avatarUrl: '/assets/images/avatars/avatar_4.jpg',
        replyComment: [
          {
            id: 'r1',
            userId: 'u2',
            message: 'Totally agree!',
            postedAt: new Date().toISOString(),
            tagUser: 'Neeraj',
          },
        ],
        users: [{ id: 'u2', name: 'Anita', avatarUrl: '/assets/images/avatars/avatar_5.jpg' }],
      },
    ],
  };

  const MOCK_LATEST = [
    {
      id: 'post-2',
      title: 'The Future of Corporate Bond Investing: Trends Shaping 2025',
      coverUrl: '/assets/images/blogs/blog1.png',
      description:
        "Explore the emerging trends in corporate bond markets, from ESG integration to digital trading platforms, and how they're reshaping investment strategies for the coming year.",
      author: { name: 'Research Desk' },
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      categories: ['Education'],
      totalViews: 980,
      readingTime: '7 min read',
    },
    {
      id: 'post-3',
      title: 'The Future of Corporate Bond Investing: Trends Shaping 2025',
      coverUrl: '/assets/images/blogs/blog2.png',
      description:
        "Explore the emerging trends in corporate bond markets, from ESG integration to digital trading platforms, and how they're reshaping investment strategies for the coming year.",
      author: { name: 'Finance Coach' },
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      categories: ['Taxes'],
      totalViews: 1520,
      readingTime: '5 min read',
    },
    {
      id: 'post-4',
      title: 'The Future of Corporate Bond Investing: Trends Shaping 2025',
      coverUrl: '/assets/images/blogs/blog3.png',
      description:
        "Explore the emerging trends in corporate bond markets, from ESG integration to digital trading platforms, and how they're reshaping investment strategies for the coming year.",
      author: { name: 'Bonds Team' },
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      categories: ['Strategy'],
      totalViews: 640,
      readingTime: '8 min read',
    },
  ];

  // Prefer API data, but fall back to mock for local testing
  const postData = post || MOCK_POST;
  const latestPostsData = latestPosts && latestPosts.length ? latestPosts : MOCK_LATEST;

  const renderSkeleton = <PostDetailsSkeleton />;

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${postError?.message}`}
        action={
          <Button
            component={RouterLink}
            href={paths.post.root}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
            sx={{ mt: 3 }}
          >
            Back to List
          </Button>
        }
        sx={{ py: 10 }}
      />
    </Container>
  );

  const renderPost = postData && (
    <>
      <PostDetailsHero
        title={postData.title}
        author={postData.author}
        coverUrl={postData.coverUrl}
        createdAt={postData.createdAt}
      />

      <Container>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </Container>
      {/* <Container
        maxWidth={false}
        sx={{
          py: 3,
          mb: 5,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <CustomBreadcrumbs
          links={[
            {
              name: 'Home',
              href: '/',
            },
            {
              name: 'Blog',
              href: paths.post.root,
            },
            {
              name: postData?.title,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container> */}

      {/* <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Typography variant="subtitle1" sx={{ mb: 5 }}>
            {postData.description}
          </Typography>

          <Markdown children={postData.content} />

          <Stack
            spacing={3}
            sx={{
              py: 3,
              borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
              borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <Stack direction="row" flexWrap="wrap" spacing={1}>
              {postData.tags.map((tag) => (
                <Chip key={tag} label={tag} variant="soft" />
              ))}
            </Stack>

            <Stack direction="row" alignItems="center">
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    size="small"
                    color="error"
                    icon={<Iconify icon="solar:heart-bold" />}
                    checkedIcon={<Iconify icon="solar:heart-bold" />}
                  />
                }
                label={fShortenNumber(postData.totalFavorites)}
                sx={{ mr: 1 }}
              />

              <AvatarGroup>
                {postData.favoritePerson.map((person) => (
                  <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
                ))}
              </AvatarGroup>
            </Stack>
          </Stack>

          <Stack direction="row" sx={{ mb: 3, mt: 5 }}>
            <Typography variant="h4">Comments</Typography>

            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
              ({postData.comments.length})
            </Typography>
          </Stack>

          <PostCommentForm />

          <Divider sx={{ mt: 5, mb: 2 }} />

          <PostCommentList comments={postData.comments} />
        </Stack>
      </Container> */}
    </>
  );

  const renderLatestPosts = (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Recent Posts
      </Typography>

      <PostList
        posts={latestPostsData.slice(latestPostsData.length - 3)}
        // loading={latestPostsLoading}
        disabledIndex
      />
    </>
  );

  return (
    <>
      {/* {postLoading && !post && renderSkeleton} */}

      {/* {postError && !post && renderError} */}

      {renderPost}

      <Container sx={{ pb: 15, pt: 15 }}>{!!latestPostsData.length && renderLatestPosts}</Container>
    </>
  );
}
