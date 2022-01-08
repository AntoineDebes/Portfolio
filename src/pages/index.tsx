import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import "./index.scss"
import ListIcon from "../components/ListIcon"
import "../css/icomoon.css"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query ProfileImageQuery {
      profileImage: file(relativePath: { eq: "new-profile-pic.webp" }) {
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: BLURRED
            quality: 100
            width: 200
            webpOptions: { quality: 100 }
            breakpoints: [500, 767]
          )
        }
      }
    }
  `)

  const profileImage: any = getImage(data.profileImage)
  return (
    <>
      <div className="wrapper" id="wrapper">
        <div className="wrapper__container">
          <div className="wrapper__container__picture__container">
            <div className="wrapper__container__picture">
              <GatsbyImage
                image={profileImage}
                className="gatsby-image-wrapper--mobile"
                alt="Gaby's face photo"
                loading="eager"
              />
            </div>
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 1000 1000"
              enableBackground="new 0 0 1000 1000"
              xmlSpace="preserve"
            >
              <circle className="st0" cx="500" cy="500" r="302.8">
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 500 500"
                  to="360 500 500"
                  dur="100s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
          <div className="wrapper__container__title">
            <h1 className="main__title">Hi, I'm Antoine Debes</h1>
          </div>

          <div className="wrapper__container__icons">
            <ListIcon
              icomoonClass="icon-github"
              name="Github"
              webUrl="https://github.com/AntoineDebes"
            />
            <ListIcon
              icomoonClass="icon-linkedin"
              name="Linkedin"
              webUrl="https://www.linkedin.com/in/antoine-debes/"
            />
            <ListIcon
              icomoonClass="icon-instagram"
              name="Instagram"
              webUrl="https://www.instagram.com/antoinedebes/"
            />
          </div>

          <div className="wrapper__container__content">
            <div className="wrapper__container__content__paragraph">
              <p>
                I find pride at defining myself as being a self taught
                Full-stack Web Developer. Coming from an accounting background,
                discovering Web development was like getting introduced to a
                whole new world where art and science can be combined
              </p>
              <p>
                Here are some of the languages that I feel comfortable to work
                with
              </p>
            </div>

            <ul className="wrapper__container__content__icons">
              <ListIcon
                icomoonClass="icon-html-five"
                name="HTML5"
                webUrl="https://html5.org/"
              />
              <ListIcon
                icomoonClass="icon-css3"
                name="CSS3"
                webUrl="https://www.w3.org/Style/CSS/Overview.en.html"
              />
              <ListIcon
                icomoonClass="icon-node-dot-js"
                name="Javascript"
                webUrl="https://www.javascript.com/"
              />
              <ListIcon
                icomoonClass="icon-mysql"
                name="MYSQL"
                webUrl="https://www.mysql.com/"
              />
              <ListIcon
                icomoonClass="icon-php"
                name="PHP"
                webUrl="https://www.php.net/"
              />
            </ul>

            <div className="wrapper__container__content__skills">
              <p>And here are the tools</p>
              <ul className="wrapper__container__content__icons">
                <ListIcon
                  icomoonClass="icon-tailwindcss"
                  name="TailwindCSS"
                  webUrl="https://tailwindcss.com/"
                />
                <ListIcon
                  icomoonClass="icon-react"
                  name="ReactJS"
                  webUrl="https://reactjs.org/"
                />{" "}
                <ListIcon
                  icomoonClass="icon-mongodb"
                  name="MongoDB"
                  webUrl="https://www.mongodb.com/"
                />
                <ListIcon
                  icomoonClass="icon-git"
                  name="Git"
                  webUrl="https://git-scm.com"
                />
                <ListIcon
                  icomoonClass="icon-tux"
                  name="Linux"
                  webUrl="https://www.linux.org/"
                />
              </ul>
            </div>
          </div>
          <div className="webring">
            <p className="batata__harra text-align-center">
              <span className="batata__harra__text">
                A proud member of Batata Harra Webring
              </span>
            </p>
            <div className="batata__harra__icon">
              <a
                title="Visit abouhanna.com"
                aria-label="visit Abou Hanna Dot Com"
                className="text-decoration-none p-1"
                href="https://abouhanna.com"
              >
                <i role="img" className="icon-chevron-left" />
              </a>
              <a
                rel="noopener"
                title="Batata Harra Webring"
                aria-label="visit Batata Harra Dot Guru"
                className="text-decoration-none m-1"
                href="https://batataharra.guru"
                target="_blank"
              >
                <span>
                  <img
                    className="harra"
                    src="../images/flame.gif"
                    alt="Flame"
                  />
                  <span className="batata">
                    <img alt="Potato" src="../images/batata.webp" />
                  </span>
                </span>
              </a>
              <a
                title="Visit gabykaram.com"
                aria-label="visit Gaby Karam DOT COM"
                className="text-decoration-none p-1"
                href="https://gabykaram.com"
              >
                <i role="img" className="icon-chevron-right" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IndexPage
