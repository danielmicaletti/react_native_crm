import React, { Component } from 'react';
import { Text, View, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import CompanyItem from './CompanyItem';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexWrap: 'wrap',
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#E5E5E5'
	},
});

class CompanyList extends Component {

	static navigationOptions = {
		tabBarLabel: 'Companies',
		tabBarIcon: ({ tintColor }) => (
				<Icon 
					style={{ color: tintColor }}
					name={'business'}
					size={45}
				/>				
			),
	}

	render(){

		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
		});

		this.dataSource = ds.cloneWithRows(this.props.companies);

		return (
			<View style={styles.container}>
				<ListView 
					enableEmptySections={true}
					dataSource={this.dataSource}
					renderRow={(rowData) => 
						<CompanyItem companies={rowData} />
					}
				/>
			</View>
		);
	}
};

const mapStateToProps = state => {
	const people = _.map(state.people, (val, uid) => {
		return { ...val, uid };
	});

	const companies = _.chain(people).groupBy('company')
		.map((val,key) => {
			return {
				company: key,
				names: val
			};
		}).value();

	return { companies };
}

export default connect(mapStateToProps)(CompanyList);

