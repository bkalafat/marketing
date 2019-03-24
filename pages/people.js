import React, { Component } from "react";
import fetch from "node-fetch";
import Layout from '../components/Layout';
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';
import DynamicLink from "../components/DynamicLink";
import CallToAction from "../components/CallToAction";
import LazyLoad from "react-lazy-load";

export default class People extends Component {
  static chunk(array, size) {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i++) {
      const last = chunked_arr[chunked_arr.length - 1];
      if (!last || last.length === size) {
        chunked_arr.push([array[i]]);
      } else {
        last.push(array[i]);
      }
    }
    return chunked_arr;
  }

  static async getInitialProps() {
    const res = await fetch('https://utdcometmarketing-api.herokuapp.com/members?_sort=name')
    let people = await res.json()
    people = this.chunk(people, 3)
    return { people }
  }

  componentWillMount() {
    this.setState({
      posts: this.props.people
    })
  }

/*
    <Row className='justify-content-center'>
      <Col sm='6'>
        <p className='lead'>Creative, talented, and looking for a way to show it off?</p>
        <p className='lead'>Comet Marketing is looking for designers, photographers, videographers, illustrators, and more to join the team!</p>
        <p className='lead'>We work on flyers, posters, social media posts, short videos, photoshoots, and more!</p>
        <CallToAction dark href='https://goo.gl/forms/vCYE7wFGCeralb9B3'>Join Here!</CallToAction>
      </Col>
    </Row>
*/
  render() {
    return(
      <Layout title='People' pageName='People' intro='This Is Us' banner='/static/Group_pic2_optimized.jpg' description='Meet the talented UTD students behind Comet Marketing' keywords='comet marketing,Comet Marketing,UTD,this is us,people,members' author='Al Madireddy,Mustafa Sadriwala'>
        <Container>
          {this.props.people.map((row, i) => (
            <Row key={i} className='row-no-margin'>
              {row.map((person) => (
                <Col className='person-listing' sm="4" key={person.id}>
                  <DynamicLink displayRoute='people' actualRoute='person' slug={person.slug}>
                    {!!person.profilepicture &&
                      <LazyLoad offset={500}>
                      <div className='crop'>
                        <img alt={'comet_marketing' + person.name} className='img-fluid' src={person.profilepicture.url}></img>
                      </div>
                      </LazyLoad>
                    }
                    <h2 className='heading'>{person.name}</h2>
                    <p className='lead'>{person.role}</p>
                    <p className='content'>{person.bio.substring(0, 100) + '...'}</p>
                    <Button>Read more</Button>
                  </DynamicLink>
                </Col>
              ))}
            </Row>
          ))}
        </Container>
      </Layout>
    )
  }
}
