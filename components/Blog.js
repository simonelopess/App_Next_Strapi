import React from 'react';
import Link from 'next/link'
import Styles from '../styles/Blog.module.css';

export default function Blog({ description, title, slug }) {
    return (
        <Link href={`/posts/${slug}`} >
            <a className={Styles.card}>
                <h2>{title} &rarr;</h2>
                <p>{description}</p>
            </a>
        </Link>
    )
}
