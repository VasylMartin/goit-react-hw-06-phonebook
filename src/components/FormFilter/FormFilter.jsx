import { useSelector, useDispatch } from 'react-redux';
import { setFilter, getFilter } from '../../redux/contactSlice';

export const FormFiler = () => {
    const filter = useSelector(getFilter);
    const dispatch = useDispatch();

    const onChange = e => {
        dispatch(setFilter(e.currentTarget.value));
};

    return (
        <label htmlFor="filter">Find contacts by Name
                <input
                    value={filter}
                    onChange={onChange}
                    type="text"
                    name="filter"
                />
                </label>
    )
}
