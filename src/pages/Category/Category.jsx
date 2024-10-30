import { useParams, useNavigate } from "react-router-dom";
import { useGetCategoryByIdQuery } from "../../redux/Api/apiCategories";
import CardCategoryItem from "../../components/Card/CardCategoryItem";

function Category() {
  const { categoryID } = useParams();
  console.log(categoryID);

  const {
    data: category,
    isLoading,
    error,
  } = useGetCategoryByIdQuery(categoryID);
  console.log(category);

  const navigate = useNavigate();

  if (error) return <p>Errore durante il caricamento del post</p>;
  if (isLoading) return <p>Caricamento in corso...</p>;
  return (
    <>
      <h1>Categoria</h1>
      <div>
        <div className="grid grid-rows-3 grid-cols-3 gap-4">
          <CardCategoryItem
            key={category.categoryId}
            categoryID={category.categoryId}
            title={category.title}
            icon={category.icon}
            type={category.type}
          />
        </div>
        <button onClick={() => navigate("/categories")}>Indietro</button>
      </div>
    </>
  );
}

export default Category;
