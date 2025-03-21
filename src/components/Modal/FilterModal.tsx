import './FilterModal.css';

const FilterModal = ({ onClose }) => {
    return (
        <div className="filter-modal">
            <div className="modal-content">
                <h2>Filtre</h2>
                {/* Ajoutez ici les champs de filtre, comme des cases à cocher, des champs de texte, etc. */}
                <div>
                    <label>
                        Catégorie:
                        <select>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                        </select>
                    </label>
                </div>
                <div>
                    <button onClick={onClose} className="close-button">Fermer</button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;