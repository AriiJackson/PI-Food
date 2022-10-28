import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, orderAlphabetically, orderByHealthScore, filterByDiet, filterCreated } from "../../redux/actions/actions";
import { Link } from 'react-router-dom';
import './Home.css';
import NavBar from "../NavBar/NavBar";
import Filter from '../Filter/Filter';
import SearchBar from '../SearchBar/SearchBar';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';

export default function Home () {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const [ updatePage, setUpdatePage ] = useState('');
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ recipesPerPage, setRecipesPerPage ] = useState(9);
    const indexLast = currentPage * recipesPerPage;
    const indexFirst = indexLast - recipesPerPage;
    const currentRecipe = allRecipes.slice(indexFirst, indexLast);

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);

    function paginado(pageNum) {
        setCurrentPage(pageNum);
    }

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleOrder(e) {
        dispatch(orderAlphabetically(e.target.value));
        setCurrentPage(1);
        setUpdatePage(e.target.value);
    }

    function handleHealthOrder(e) {
        dispatch(orderByHealthScore(e.target.value));
        setCurrentPage(1);
        setUpdatePage(e.target.value);
    }

    function handleDiet(e) {
        dispatch(filterByDiet(e.target.value))
        setCurrentPage(1);
    }

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
    }
    
    return (
        <div id='home'>
            {/* NavBar */}
            <NavBar/>
        
            {/* Filtro  y ordenamiento */}
            <Filter 
                handleOrder={handleOrder}
                handleHealthOrder={handleHealthOrder}
                handleDiet={handleDiet}
                handleFilterCreated={handleFilterCreated}
            />

            {/* Paginado */}
            <Pagination 
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                paginado={paginado}
            />

            {/* Card */}
            <div className='gridCard'>
            {
                currentRecipe?.map((r) => {
                    return (
                        <div key={r.id} className='divCard'>
                            <Link to={`/home/${r.id}`}>
                                <Card 
                                    key={r.id}
                                    name={r.name}
                                    healthScore={r.healthScore}
                                    image={r.image}
                                    diets={r.diets}
                                />
                            </Link>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

/* 
    class Home extends React.Component () {
        componentDidMount () {
            const recipeID = this.props.match.params.id; 
            this.props.getRecipes(recipeID);

            render() {
                return (
                    <div>
                        ...
                    </div>
                )
            }
        }
    }

    function mapStateToProps (state) {
        return {
            recipes: state.recipes
        }
    }

    function mapDispatchToProps (dispatch) {
        return {
            getRecipes: recipeID => dispatch(getRecipes(recipeID))
        }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(Home);
*/