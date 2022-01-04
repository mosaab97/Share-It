import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom' 
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core' 
import ChipInput from 'material-ui-chip-input' 
import Form from '../form/Form'
import Posts from '../posts/Posts'
import Paginate from '../pagination/Pagination';
import useStyles from './styles';
import { getPostsBySearch } from '../../redux/actions/posts';


function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Home() {
    const classes = useStyles()
    const [currentId, setCurrentId] = useState(null)
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    const dispatch = useDispatch();
    const query = useQuery()
    const navigate = useNavigate();

    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery')

    const handleKeyPress = (e) => {
      if(e.which === 13) {
        searchPost()
      }
    }

    const handleAdd = (tag) => setTags([...tags, tag])

    const handleDelete = (tagToDelete) => setTags(tags.filter(tag => tag !== tagToDelete))

    const searchPost = () => {
      if(search.trim() || tags.length > 0) {
        dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
      } else {
        navigate('/')
      }
    }
    return (
        <Grow in>
        <Container maxWidth='xl'> 
          <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                <TextField 
                  name='search'
                  variant='outlined'
                  label='Search'
                  fullWidth
                  value={search}
                  onChange={(e)=> setSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <ChipInput 
                  style={{margin: '10px 0px'}}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label="Search Tags"
                  variant='outlined'
                />
                <Button className={classes.searchButton} color='primary' variant='contained' onClick={searchPost}>
                  Search
                </Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              {(!searchQuery && tags.length === 0) &&
                <Paper elevation={6} className={classes.pagination }>
                  <Paginate page={page}/>
                </Paper>
              }
            </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}

export default Home