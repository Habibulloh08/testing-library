

interface GreetProps {
    name?: string;
}

const Greet = ({ name }: GreetProps) => {
    return (
        <div>
            User {name ? name : 'Guest'}
        </div>
    )
}

export default Greet
