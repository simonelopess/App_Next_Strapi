import Header from '../../components/Header';
import ContentWrapper from '../../components/ContentWrapper';

import Footer from '../../components/Footer';

const URL = process.env.STRAPIBASEURL

//cria rotas dinamicas
export async function getStaticPaths() {

    const fetchParams = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            query: `{
                blogposts {
                    slug
                }
            }`
        })
    }

    const res = await fetch(`${URL}/graphql`, fetchParams);
    const posts = await res.json();
    const paths = posts.data.blogposts.map((post) => {
        return { params: { slug: post.slug } }
    })
    //cria rotas dinamicas
    return {
        paths: paths,
        fallback: true
    };
}

export async function getStaticProps({ params }) {
    const fetchParams = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            query: `{
                blogposts(where: {slug: "${params.slug}"}){
                    title
                    description
                    blogbody
                    splash{
                        url
                    }
                }
            }`
        })
    }

    const res = await fetch(`${URL}/graphql`, fetchParams);
    const { data } = await res.json();

    return {
        props: data.blogposts[0]
    }
}

export default function Content({ title, blogbody, splash }) {
    return (
        <ContentWrapper>
            <Header />
            <h1>{title}</h1>
            <Footer />
        </ContentWrapper>
    )
}
