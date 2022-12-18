import { Component } from 'react';

import './styles.css'

import {Posts} from '../../components/Posts'
import {loadPosts} from '../../Utils/loadPosts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: ""
  };

  async componentDidMount(){
    await this.loadPosts();
  };
  
  loadPosts = async () => {
    const {page, postsPerPage} = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
    posts: postsAndPhotos.slice(page,postsPerPage),
    allPosts: postsAndPhotos
  }); 
  }

  loadMorePosts = () => {
    const{
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({posts, page:nextPage});

  }

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({searchValue: value});
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue} = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;


    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }): posts;

    return (
    <section className='container'>
      <div className="search-container">

      {!!searchValue && (
      <>
      <h1>Search value: {searchValue}</h1><br />
      </>
      )} 

      <TextInput 
      searchValue={searchValue}
      handleChange={this.handleChange}
      /> 
      </div>
      <br></br><br></br>
      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts =( </p>
      )}
      <div className="button-container">
        {!searchValue && (
          <Button 
          disabled={noMorePosts}
          text="load more posts"
          onClick={this.loadMorePosts}
          />
          )}
      </div>
    </section>
    );
  }
}

export default Home;
