export function comma( number ) {
    let n = String(number)
    let m = "";
    for ( let i = 0; i < n.length; i++ ) {
        let c = n.substr( n.length - i - 1, 1 );
        if ( i % 3 == 0 & i > 0 ) {
            m = c + ',' + m;
        } else {
            m = c + m;
        }
    }
    return m;
}