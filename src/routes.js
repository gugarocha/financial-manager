import {BrowserRouter ,Route, Switch} from 'react-router-dom'

import Home from './pages/Home';
import NewEntry from './pages/NewEntry';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/newEntry' component={NewEntry} />
            </Switch>
        </BrowserRouter>
    )
}