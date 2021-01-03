import React from 'react'
import './styles.css'
import HomePage from '../HomePage'
import Login from '../Login'
import Register from '../Register'
import Dashboard from '../Dashboard'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ReportMissing from '../ReportMissing'
import  ReportBuffer  from '../ReportBuffer';
import ReportFound from '../ReportFound'

const theme = createMuiTheme()

export default function App() {

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/report/found" component={ReportFound} />
					<Route exact path="/report/missing" component={ReportMissing} />
					<Route exact path="/report_buffer" component={ReportBuffer}/>
				</Switch>
			</Router>
		</MuiThemeProvider>
	)
}