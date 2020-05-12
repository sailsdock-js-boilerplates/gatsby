import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import React from 'react';
import Footer from '../components/Footer';
import CodeTabs from '../components/CodeTabs';
import CodeClipboard from '../components/CodeClipboard';
import BlogMain from '../components/Blog/BlogMain';
import BlogArticle from '../components/Blog/BlogArticle';
import LayoutNav from '../components/LayoutNav';
import Auth from '../components/Auth';

export default class Blog extends React.Component {
    componentDidMount() {
        this._codeTabs = new CodeTabs();
        this._codeClipboard = new CodeClipboard();
    }

    componentWillUnmount() {
        this._codeTabs = null;
        this._codeClipboard.dispose();
    }

    render() {
        const { data } = this.props;
        const { mdx: { code, frontmatter: { title, mainPage, date, author, needsAuth }, excerpt, timeToRead } } = data;

        return (
            <Auth needsAuth={needsAuth}>
                <div className="blog">
                    <Helmet>
                        <title>{title}</title>
                        <meta name="description" content={excerpt} />
                        <meta name="og:description" content={excerpt} />
                        <meta name="twitter:description" content={excerpt} />
                        <meta name="og:title" content={title} />
                        <meta name="og:type" content="article" />
                        <meta name="twitter.label1" content="Reading time" />
                        <meta
                            name="twitter:data1"
                            content={`${timeToRead} min read`}
                        />
                    </Helmet>
                    <main className="content">
                        <header className="header">
                            <LayoutNav opaque={!mainPage} fixed={mainPage}/>
                            {mainPage &&
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="intro blog-intro text-center col">
                                            <div className="container-fluid container-fluid-max-lg">
                                                <h1 className="h1">Blog</h1>
                                                <h2 className="h3">Where good ideas come from</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </header>

                        <div className="clay-site-container container">
                            <div className="row">
                                <div className="col-md-12">

                                    {/*renders a blog post content */}
                                    {!mainPage &&
                                        <article>
                                            <BlogArticle title={title} author={author} date={date} codeBody={code.body} location={this.props.location} />
                                        </article>
                                    }

                                    {/* renders the main page */}
                                    {mainPage &&
                                        <BlogMain title={title} excerpt={excerpt} timeToRead={timeToRead} />
                                    }

                                </div>
                            </div>
                        </div>
                    </main>

                    <Footer />
                </div>
            </Auth>
        );
    }
}


export const pageQuery = graphql`
    query($slug: String!) {
        mdx(fields: { slug: { eq: $slug } }) {
            excerpt
            timeToRead
            frontmatter {
                title
                mainPage
                date(formatString: "MMMM DD, YYYY")
                author
                needsAuth
            }
            code {
                body
            }
        }
    }
`;