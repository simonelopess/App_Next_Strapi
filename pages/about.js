import React from 'react'
import ContentWrapper from '../components/ContentWrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/About.module.css';
import ReactMarkdown from 'react-markdown';
const URL = process.env.STRAPIBASEURL


export async function getStaticProps() {

    const fetchParams = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            query: `
            {
                aboutcontents{
                  body
                }
              }
            `
        })
    }

    const res = await fetch(`${URL}/graphql`, fetchParams);
    const { data } = await res.json();


    return {
        props: data?.aboutcontents[0],
        revalidate: 10
    };
}

export default function About({ body }) {
    return (
        <ContentWrapper>
            <Header />
            <div className={styles.bodyContext}>
                <ReactMarkdown>{body}</ReactMarkdown>
            </div>
            <Footer />
        </ContentWrapper>
    )
}
