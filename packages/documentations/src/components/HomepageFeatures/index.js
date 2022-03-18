import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
    {
        title: 'Familiarity with a Twist',
        description: (
            <>
                AutoMapper TypeScript was designed to be familiar with the
                original .NET AutoMapper but with a twist to adapt to JS tooling
                ecosystem.
            </>
        ),
    },
    {
        title: 'Performance Matters',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (
            <>
                Built with pre-optimization for JS engines in mind, AutoMapper
                TypeScript is performant in discovering, storing, and executing
                Mappings.
            </>
        ),
    },
    {
        title: 'Powered by TypeScript',
        description: (
            <>
                Developer Experience is important. Hence, AutoMapper TypeScript
                prioritizes DX by providing top-notch autocomplete experience
                for developers.
            </>
        ),
    },
    {
        title: 'Flexibility is Key',
        description: (
            <>
                AutoMapper TypeScript is not tied to a single way of handling
                metadata of the application entities. Different use-cases
                utilize different strategies.
            </>
        ),
    },
    {
        title: 'NestJS Integration',
        description: (
            <>
                Official integration with{' '}
                <a href="https://nestjs.com" target="_blank">
                    NestJS
                </a>
            </>
        ),
    },
    {
        title: 'Opinionated',
        description: (
            <>
                While being flexible in how it works, AutoMapper TypeScript is
                opinionated to keep the users on the track of{' '}
                <em>"Convention over Configuration"</em>.
            </>
        ),
    },
];

function Feature({ Svg, title, description }) {
    return (
        <div className={clsx('col col--4')}>
            {/*<div className="text--center">*/}
            {/*    <Svg className={styles.featureSvg} role="img" />*/}
            {/*</div>*/}
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
