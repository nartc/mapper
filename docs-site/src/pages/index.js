import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Familiarity',
    description: (
      <>
        AutoMapper TypeScript follows as close as possible to the original{' '}
        <a href="https://automapper.org/" target="_blank">
          .NET AutoMapper
        </a>{' '}
        so that it is familiar to use
      </>
    ),
  },
  {
    title: 'Well-documented',
    description: (
      <>
        Documentations are powered by{' '}
        <a href="https://v2.docusaurus.io/" target="_blank">
          Docusaurus
        </a>{' '}
        which allows for ease of documenting AutoMapper TypeScript API
      </>
    ),
  },
  {
    title: 'Written in TypeScript',
    description: (
      <>
        Written entirely in TypeScript which allows the consumers to get
        type-safety out of the box.
      </>
    ),
  },
  {
    title: 'Plugin-based',
    description: (
      <>
        Extensibility is achieved with Plugin-based approach. Official plugins
        allow for working with TS/ES6 Classes and POJOs. Custom plugins can be
        created with well-defined API and guide.
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
    title: 'Powered by Nx',
    description: (
      <>
        AutoMapper TypeScript packages are powered by{' '}
        <a href="https://nx.dev" target="_blank">
          Nx Dev Tools
        </a>{' '}
        which paves the way for maintainability, scalability, and also welcoming
        to contributors
      </>
    ),
  },
];

function Feature({ title, description }) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout title={`🚀${siteConfig.title}🚀`} description={siteConfig.tagline}>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted
              )}
              to={useBaseUrl('docs/introduction/what-why')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
