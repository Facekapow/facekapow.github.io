import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="404: Not Found" />
        <h1>Not Found</h1>
        <div style={{
          display: `flex`,
          flexFlow: `row nowrap`,
          alignItems: `center`,
          justifyContent: `center`,
        }}>
          <img alt="Grimacing Face Emoji" src="/vendor/openmoji/grimacing-face.svg" style={{
            width: `5em`,
            height: `5em`,
            margin: `0`,
          }} />
          <span>It seems like that page doesn't exist...</span>
        </div>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
