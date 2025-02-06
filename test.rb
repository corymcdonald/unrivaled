urls = %(
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/breanna-stewart/images/mist-headshot.jpg?v=1738721734972"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/napheesa-collier/images/lunar-owls-headshot.jpg?v=1738721719662"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/chelsea-gray/images/rose-headshot.jpg?v=1738721699843"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/arike-ogunbowale/images/vinyl-headshot.jpg?v=1738721680423"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/jewell-loyd/images/mist-headshot.jpg?v=1738721660792"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/rhyne-howard/images/vinyl-headshot.jpg?v=1738721612896"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/kahleah-copper/images/rose-headshot.jpg?v=1738721569548"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/jackie-young/images/laces-headshot.jpg?v=1738721549479"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/dearica-hamby/images/vinyl-headshot.jpg?v=1738721503753"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/kayla-mcbride/images/laces-headshot.jpg?v=1738721483262"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/marina-mabrey/images/phantom-headshot.jpg?v=1738721464257"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/satou-sabally/images/phantom-headshot.jpg?v=1738721447747"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/allisha-gray/images/lunar-owls-headshot.jpg?v=1738721431297"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/natasha-cloud/images/phantom-headshot.jpg?v=1738721411107"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/skylar-diggins-smith/images/lunar-owls-headshot.jpg?v=1738721396194"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/rickea-jackson/images/mist-headshot.jpg?v=1738721379143"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/dijonai-carrington/images/mist-headshot.jpg?v=1738721353704"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/brittney-sykes/images/rose-headshot.jpg?v=1738721318745"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/shakira-austin/images/lunar-owls-headshot.jpg?v=1738721301821"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/tiffany-hayes/images/laces-headshot.jpg?v=1738721287191"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/azura-stevens/images/rose-headshot.jpg?v=1738721257409"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/courtney-williams/images/lunar-owls-headshot.jpg?v=1738721238937"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/kate-martin/images/laces-headshot.jpg?v=1738721223436"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/aaliyah-edwards/images/mist-headshot.jpg?v=1738721209132"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/lexie-hull/images/rose-headshot.jpg?v=1738721192230"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/aliyah-boston/images/vinyl-headshot.jpg?v=1738721176291"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/alyssa-thomas/images/laces-headshot.jpg?v=1738721161666"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/rae-burrell/images/vinyl-headshot.jpg?v=1738721125320"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/jordin-canada/images/vinyl-headshot.jpg?v=1738721104523"
"https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/katie-lou-samuelson/images/phantom-headshot.jpg?v=1738721071590"
)

# go to each link and download into a file with the name of the index in the urls array
urls.split("\n").each_with_index do |url, index|
  # download it into /assets/players/#{index}.jpg
  `curl #{url} > app/assets/players/#{index}.jpg`
end
