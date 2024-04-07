module.exports={
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        marginRight: 16, // Add margin between cards
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        borderColor: '#34495E', // Set the border color to red
        borderWidth: 1.5,
        shadowOpacity: 0.2,
        elevation: 10, // For Android shadow
        height:75,
      },
      card1: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 18,
        marginRight: 6, // Add margin between cards
        marginLeft: 6, // Add margin between cards
        shadowColor: '#000',
        elevation: 5, // For Android shadow
        height:72,
        // top:10,
        marginBottom:5,
      },
      gridCard: {
        backgroundColor: '#A9CCE3',
        borderRadius: 10,
        padding: 8,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 10,
        // flex: 1,
        height:150,
        width:'45.5%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      gridCard2: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 10,
        // flex: 1,
        height:150,
        width:'45.5%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      gridCard3: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 8,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 10,
        // flex: 1,
        height:130,
        width:'42%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      gridContainer: {
        flexDirection: 'row', // Arrange gridCard elements horizontally
        flexWrap: 'wrap', // Allow elements to wrap to the next line
        justifyContent: 'flex-start', // Align elements to the left
        top:-55,
        // width:500

      },
}