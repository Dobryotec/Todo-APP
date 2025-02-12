import TodoForm from '@/components/TodoForm/TodoForm';
import TodosList from '@/components/TodosList/TodosList';

const Home: React.FC = () => {
  return (
    <main>
      <div className="container">
        <h1 className="text-center mb-5 text-2xl font-bold md:text-3xl md:mb-10">
          My Simple Todo List
        </h1>
        <TodoForm />
        <TodosList />
      </div>
    </main>
  );
};

export default Home;
