import {BrowserRouter ,Route, Switch} from 'react-router-dom'

import Home from './pages/Home';
import NewEntry from './pages/NewEntry';
import Report from './pages/Report';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/newEntry' component={NewEntry} />
                <Route path='/report' component={Report} />
            </Switch>
        </BrowserRouter>
    )
}