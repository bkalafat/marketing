import Layout from "../components/Layout";
import DynamicLink from "../components/DynamicLink";
import FluidSectionHeader from '../components/FluidSectionHeader';
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CallToAction from "../components/CallToAction";
import ReactPlayer from 'react-player'


export default class Index extends Component {
  static async getInitialProps() {
    const res = await fetch('https://utdcometmarketing-api.herokuapp.com/projects?featured=true&_limit=3&_sort=createdAt:ASC')
    let projects = await res.json()
    const res2 = await fetch('https://utdcometmarketing-api.herokuapp.com/members?_limit=3&_sort=gradyear:ASC')
    let members = await res2.json()
    return { projects, members }
  }

  componentWillMount() {
    this.setState({
      projects: this.props.projects,
      members: this.props.members
    })
  }

  render() {
    return (    
      <Layout title='Comet Marketing' pageName='Comet Marketing' isHome={true}>
        <Container fluid className='services-container'>
          <Container className='services-grid'>
            <Row className='grid-row '>
              <Col md='7'>
                <h3 className='title'>Photography</h3>
                <hr></hr>
                <div>
                  <p>We can help cover large or small events with our amazing photographers.</p>
                  <p>After an editing period, we'll provide you with high-quality, edited photos for you to use as you see fit.</p>
                  <p>A great way to make a legacy for the future of your club.</p>
                </div>
              </Col>
              <Col md='5'>
                <img className='img-fluid' height='100%' width='100%' src='./static/photo.png'></img>
              </Col>
            </Row>
            <Row className='grid-row reverse-items'>
              <Col md='7' className='order-md-2'>
                <h3 className='title'>Graphic Design</h3>
                <hr></hr>
                <div>
                  <p>Our team of designers can help inspire new designs and ideas to advertise your upcoming events!</p>
                  <p>With custom flyers and posters to put around campus and online your event will be as bustling as ever.</p>
                </div>
              </Col>
              <Col md='5'>
                <img className='img-fluid' height='100%' width='100%' src='./static/design.png'></img>
              </Col>
            </Row>
            <Row className='grid-row'>
              <Col md='7'>
                <h3 className="title">Web Design</h3>
                <hr></hr>
                <div>
                  <p><span>&#191;</span>Like our website?</p>
                  <p>We can help you make a new or update an old website to cater to your clubs needs on the internet.</p>
                  <p>Having an online presence will help to keep your organization relevant in the 21st century.</p>
                </div>
              </Col>
              <Col md='5'>
                <img className='img-fluid' height='100%' width='100%' src='./static/web.png'></img>
              </Col>
            </Row>
            <Row className='grid-row reverse-items'>
              <Col md='7' className='order-md-2'>
                <h3 className='title'>Videography</h3>
                <hr></hr>
                <div>
                  <p>Invite some of our talented film crew to your events and we can create you a video to highlight your organization.</p>
                  <p>Whether it be for spreading information or promoting an upcoming event, video advertising is a powerful tool we can help you with.</p>
                </div>
              </Col>
              <Col md='5'>
                <img className='img-fluid' height='100%' width='100%' src='./static/video.png'></img>
              </Col>
            </Row>
          </Container>
        </Container>
        <FluidSectionHeader text='Recent Projects' className='projects-header' backgroundImage='/static/bookparty_optimized.jpg'></FluidSectionHeader>
        <Container>
          <div className='recent-projects'>
          <Row className='home-video justify-content-center'>
            <div className='player-wrapper justify-content-center'>
              <ReactPlayer
                url='https://www.youtube.com/watch?v=SNR5vzwwrj0'
                className='react-player'
                controls
                width='100%'
                height='100%'
              />
            </div>
          </Row>
          </div>
        </Container>
        <FluidSectionHeader text='Meet Our Team' className='team-header' backgroundImage='/static/group-home-optimized.jpg'></FluidSectionHeader>
        <Container>
          <div className='meet-our-team'>
            <Row className='recent-projects-row row-no-margin'>
              {this.props.members.map((person) => (
                <Col md='4' className='person-listing' key={person.id}>
                  <DynamicLink displayRoute='people' actualRoute='person' slug={person.slug}>
                    {!!person.profilepicture &&
                        <img className='img-fluid' src={person.profilepicture.url}></img>
                    }
                      <h2 className='heading'>{person.name}</h2>
                      <p className='lead'>{person.role}</p>
                      <p className='content'>{person.bio.substring(0, 100) + '...'}</p>
                  </DynamicLink>
                </Col>
              ))}
              <Col sm='12' className='d-flex justify-content-center'>
                <CallToAction dark href='/people'>View all</CallToAction>
              </Col>
            </Row>
          </div>
        </Container>
      </Layout>
    )
  }
}
