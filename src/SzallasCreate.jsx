import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const SzallasCreate = () => {
    const navigate = useNavigate();

    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            <h2>Új szállás</h2>
            <form
                onSubmit={
                    (e) => {
                        e.preventDefault();
                        const formData = {
                            name: e.target.name.value,
                            hostname: e.target.hostname.value,
                            location: e.target.location.value,
                            price: parseFloat(e.target.price.value),
                            minimum_nights: e.target.minimum_nights.value
                        };
                        const token = localStorage.getItem('jwt');
                        if (!token) {
                            throw new Error('Nem található JWT token!');
                        }
                        axios.post("https://szallasjwt.sulla.hu/data", formData, {
                            headers: { 
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                        })
                        .then(() => navigate("/SzallasList"))
                        .catch((error) => console.error("Hiba történt: ", error));
                    }
                }>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Szállás neve:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Szállásadó neve:</label>
                    <div className="col-sm-9">
                        <input type="text" name="hostname" className="form-control" />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Szállás helye:</label>
                    <div className="col-sm-9">
                        <input type="text" name="location" className="form-control" />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Ár:</label>
                    <div className="col-sm-9">
                        <input type="number" name="price" className="form-control" />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Minimum foglalható éjszakák:</label>
                    <div className="col-sm-9">
                        <input type="text" name="minimum_nights" className="form-control" />
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Küldés</button>
            </form>
            <div>
                <Link to="/SzallasList" className="bi bi-backspace-fill fs-6 btn btn-danger">Vissza</Link>
            </div>
        </div>
    );
};
