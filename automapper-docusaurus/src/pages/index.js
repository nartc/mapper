import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Familiarity</>,
    description: (
      <>
        <code>@nartc/automapper</code> follows as close as possible to the
        original <code>.NET AutoMapper</code> so that it is familiar to use.
      </>
    ),
  },
  {
    title: <>Easy to use</>,
    description: (
      <>
        Clear documentations along with an utility{' '}
        <code>Transformer Plugin</code> make adopting{' '}
        <code>@nartc/automapper</code> easier than ever.
      </>
    ),
  },
  {
    title: <>Powered by TypeScript</>,
    description: (
      <>
        <code>@nartc/automapper</code> is written entirely in{' '}
        <code>TypeScript</code>. Consumers will get type-safety out of the box
        which greatly enhances the Developer Experience.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title} - Documentations`}
      description="AutoMapper for TypeScript Documentations"
    >
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted
              )}
              to={useBaseUrl('docs/introduction/why')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
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
